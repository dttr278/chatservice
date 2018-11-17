package Service;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;

@Path("/members")
public class GroupMembers {
	@GET
	@Path("{grId}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getGroupsMember(@HeaderParam("Authorization") String token,@PathParam("grId") String grId) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getGroupsMember(id, grId);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
}
