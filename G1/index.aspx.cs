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
        protected void Page_Load(object sender, EventArgs e)
        {
            this.Page.ClientScript.GetPostBackEventReference(bpostback, string.Empty);
            if (Page.IsPostBack)
                throw new Exception(Request["__EVENTTARGET"] + " -- " + Request["__EVENTARGUMENT"]);
        }

        protected void bpostback_Click(object sender, EventArgs e)
        {
            throw new Exception("Postback pressed");
        }
    }
}
