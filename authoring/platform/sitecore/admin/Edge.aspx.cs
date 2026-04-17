using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace HztlFoundation.sitecore.admin
{
    public partial class Edge : System.Web.UI.Page
    {
        protected string ResultText
        {
            get => Session["edge-result-text"] as string;
            set => Session["edge-result-text"] = value;
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["experienceedge"]?.ConnectionString;
            if (connectionString != null && !string.IsNullOrEmpty(connectionString))
            {
                _connStr.Text = connectionString;
            }
            else
            {
                _clearCache.Enabled = false;
                _deleteContent.Enabled = false;
                _getSettings.Enabled = false;
                _getWebhooks.Enabled = false;
                _getAccessToken.Enabled = false;
                _connStr.Text = "No experienceedge connection string.";
            }

            _result.Text = ResultText;
            ResultText = "";
        }

        protected void _clearCache_Click(object sender, EventArgs e)
        {
            MakeRequest("/cache", "DELETE", "Cache cleared.");
            Response.Redirect(Request.RawUrl);
        }

        protected void _deleteContent_Click(object sender, EventArgs e)
        {
            MakeRequest("/content", "DELETE", "All content deleted.");
            Response.Redirect(Request.RawUrl);
        }

        protected void _getSettings_Click(object sender, EventArgs e)
        {
            MakeRequest("/settings", "GET");
            Response.Redirect(Request.RawUrl);
        }
        protected void _getWebhooks_Click(object sender, EventArgs e)
        {
            MakeRequest("/webhooks", "GET");
            Response.Redirect(Request.RawUrl);
        }

        protected void _getAccessToken_Click(object sender, EventArgs e)
        {
            ResultText = GetAccessToken();
            Response.Redirect(Request.RawUrl);
        }

        protected void _createApiKey_Click(object sender, EventArgs e)
        {
            var data = "{ \"CreatedBy\":\"ADN\", \"Label\":\"Website token\", \"Scopes\": [\"content-#everything#\", \"audience-delivery\"] }";
            MakeRequest(string.Empty, "POST", string.Empty, "https://edge.sitecorecloud.io/api/apikey/v1", data);

            Response.Redirect(Request.RawUrl);
        }

        private void MakeRequest(string path, string method, string emptyRespMsg = "", string url = "https://edge.sitecorecloud.io/api/admin/v1", string data = "")
        {
            HttpClient client = new HttpClient();
            HttpRequestMessage request = new HttpRequestMessage(new HttpMethod(method), url + path);
            request.Headers.Add("Authorization", "Bearer " + GetAccessToken());
            if (!string.IsNullOrEmpty(data))
            {
                request.Content = new StringContent(data);
                request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            }
            HttpResponseMessage response = Task.Run(async () => await client.SendAsync(request)).Result;
            response.EnsureSuccessStatusCode();
            string responseBody = Task.Run(async () => await response.Content.ReadAsStringAsync()).Result;
            ResultText = responseBody;
            if (string.IsNullOrEmpty(responseBody))
            {
                ResultText = emptyRespMsg;
            }
        }

        private string GetAccessToken()
        {
            string audience = string.Empty, clientId = string.Empty, clientSecret = string.Empty;
            var connectionString = ConfigurationManager.ConnectionStrings["experienceedge"]?.ConnectionString;
            if (connectionString != null && !string.IsNullOrEmpty(connectionString))
            {
                Dictionary<string, string> values = connectionString.Split(';').ToDictionary(c => c.Split('=')[0], c => Uri.UnescapeDataString(c.Split('=')[1]));
                clientId = values["client_id"];
                clientSecret = values["client_secret"];
                audience = values["audience"];
            }

            HttpClient client = new HttpClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "https://one-sc-production.eu.auth0.com/oauth/token");
            request.Content = new StringContent("grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret + "&audience=" + audience);
            request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
            HttpResponseMessage response = Task.Run(async () => await client.SendAsync(request)).Result;
            response.EnsureSuccessStatusCode();
            string responseBody = Task.Run(async () => await response.Content.ReadAsStringAsync()).Result;
            var at = JsonConvert.DeserializeObject<AccessTokenData>(responseBody);
            return at.AccessToken;
        }
    }
    public class AccessTokenData
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
        [JsonProperty("scope")]
        public string Scope { get; set; }
        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }
        [JsonProperty("token_type")]
        public string TokenType { get; set; }
    }
}