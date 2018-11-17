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

@Path("/addgroupmember")
public class AddGroupMember {
	@POST
	@Path("{grid}/{id2}")
	@Produces(MediaType.APPLICATION_JSON)
	public String add(@PathParam("id2") String id2
			,@PathParam("grid") String grid
			,@HeaderParam("Authorization") String token) {
		String id="0";
		int rs=0;
		try {
			id=Authentication.getId(token);
			rs=DatabaseManagement.addGroupMember(grid, id, id2);
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Result.toJSResult(rs);
	}
}
