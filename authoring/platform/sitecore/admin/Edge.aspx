<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Edge.aspx.cs" Inherits="HztlFoundation.sitecore.admin.Edge" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h1>Edge</h1>
            <p>
                <span style="font-weight: bold;">Connection String:</span>
                <asp:Literal ID="_connStr" runat="server"></asp:Literal>
            </p>
            <p>
                <asp:Button ID="_getAccessToken" runat="server" OnClick="_getAccessToken_Click" Text="Get Access Token" />
                <asp:Button ID="_getSettings" runat="server" OnClick="_getSettings_Click" Text="Get Settings" />  
                <asp:Button ID="_getWebhooks" runat="server" OnClick="_getWebhooks_Click" Text="Get Webhooks" />
            </p>
            <p>
                <asp:Button ID="_clearCache" runat="server" OnClick="_clearCache_Click" Text="Clear Cache" />
                <asp:Button ID="_deleteContent" runat="server" OnClick="_deleteContent_Click" Text="Delete Content" />
            </p>
            <p>
                <asp:Button ID="_createApiKey" runat="server" OnClick="_createApiKey_Click" Text="Create API Key" />
            </p>
            <p>
                <asp:Literal ID="_result" runat="server"></asp:Literal>
            </p>
        </div>
    </form>
</body>
</html>
