using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace dnn.java.G2
{
    public partial class index : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            this.Page.ClientScript.GetPostBackEventReference(tbcontrol, string.Empty);
            tbprize.Text = "bleh!!";
            if (Page.IsPostBack)
            {
                string arg = Request["__EVENTARGUMENT"];
                var a = dnn.SecureStuff.GetCoords("G2");


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
