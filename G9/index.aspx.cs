using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace dnn.java.G1
{
    public partial class index : System.Web.UI.Page
    {
        // 1=north
        // 2=east
        // 3=south
        // 4=west
        // 5=east-noicon
        // 6=gap
        // 7=north-noicon
        // 8=west-noicon
        // 9=south-noicon

        string tab = "5161";
        string space = "51";
        string newline = "07";
        string period = "9321728171";
        string c1 = "51357581";
        string c2 = "";
        string c3 = "3122324252324275";
        string c4 = "33221292328275";
        string c5 = "5231423222324275";
        string c6 = "3522124272228271";
        string c7 = "";
        string c8 = "3322324211715212418171";
        string c9 = "337222324252324275";
        string c0 = "352214418171";
        

        protected void Page_Load(object sender, EventArgs e)
        {
            this.Page.ClientScript.GetPostBackEventReference(tbcontrol, string.Empty);
            tbprize.Text = "bleh!!";
            if (Page.IsPostBack)
            {
                string arg = Request["__EVENTARGUMENT"];
                //var a="352214418171" + "5161";  // 0
                var a = "" + tab;  // nothing
                a += c5 + tab; // 5
                a += c1 + tab;  // 1
                a += space;  // space
                a += c3 + tab;  //  3
                a += c9 + tab;  // 9
                a += period + tab;  // .
                a += c6 + tab;  // 6
                a += c3 + tab;  // 3
                a += c5 + tab;  // 5
                a += newline; //  New line (second digit is irrelevent)
                a += c0 + tab;  // 0
                a += c0 + tab;  // 0
                a += c3 + tab;  // 3
                a += space;  // space
                a += c4 + tab;  //  4
                a += c8 + tab;  //  8
                a += period + tab;  // .
                a += c0 + tab;  // 0
                a += c9 + tab;  // 9
                a += c1 + tab;  // 1

                if (arg == "win")
                    tbprize.Text = a;
                else
                    tbprize.Text = "bleh!!";
                tbcontrol.Text = arg;
            }
            
        }

        protected void bpostback_Click(object sender, EventArgs e)
        {
           
        }
    }
}
