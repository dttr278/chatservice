package Service;



import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;

@Path("/addcontact")
public class AddContact {	
	@Context HttpServletRequest request;	
	@POST
	@Path("{id2}")
	@Produces(MediaType.APPLICATION_JSON)
	public String add(@PathParam("id2") String id2,@HeaderParam("Authorization") String token) {
		String id="0";
		int rs=0;
		try {
			id=Authentication.getId(token);
			rs=DatabaseManagement.addContact(id, id2);
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Result.toJSResult(rs);
	}

}
