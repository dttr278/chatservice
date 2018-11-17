package Service;

import javax.ws.rs.DELETE;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;

@Path("/removegroupmember")
public class RemoveGroupMember {
	@DELETE
	@Path("{grid}/{dlid}")
	public String dl(@PathParam("grid") String grid
			,@PathParam("dlid") String dlid
			,@HeaderParam("Authorization") String token) {
		String id="0";
		int rs=0;
		try {
			id=Authentication.getId(token);
			rs=DatabaseManagement.deleteGroupMember(grid, id, dlid);
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Result.toJSResult(rs);
	}
}
