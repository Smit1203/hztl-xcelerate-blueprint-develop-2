package testrunners; /**
 * testrunners.TestRunner configures the settings to use for execution
 *
 * @author pshah
 */

import corerunner.BaseTestRunner;
import helper.SendEmail;
import io.cucumber.junit.Cucumber;
import io.cucumber.testng.CucumberOptions;
import org.apache.logging.log4j.LogManager;
import org.junit.runner.RunWith;

//@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/resources/features",
        glue = {"corestepdef", "stepdefinitions"},
        plugin = {"com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:"},
        monochrome = true
)
public class CommonRunner extends BaseTestRunner {
    public void sendEmail() {
        //LogManager.getLogger("BaseRunner").debug("Sending Email...");
        //sendgrid
        //SendEmail.sendSendGridEmailWithAttachment(reportZipFilePath, "zip", SendEmail.getEmailRecipient());
        //smtp
        //SendEmail.SendEmailWithAttachmentsSMTP(reportZipFilePath,SendEmail.getEmailRecipient());
        //System.out.println("sent email");
    }
}