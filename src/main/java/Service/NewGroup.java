package Service;

import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;

@Path("/newgroup")
public class NewGroup {
	@POST
	@Path("{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public String add(@PathParam("name") String name,@HeaderParam("Authorization") String token) {
		String id="0";
		int rs=0;
		try {
			id=Authentication.getId(token);
			rs=DatabaseManagement.newGroup(id, name);
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Result.toJSResult(rs);
	}
}
