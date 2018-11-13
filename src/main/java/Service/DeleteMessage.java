package Service;

import javax.ws.rs.DELETE;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;

@Path("/deletems")
public class DeleteMessage {
	@DELETE
	@Path("{msid}")
	public String dl(@PathParam("msid") String msid,@HeaderParam("Authorization") String token) {
		String id="0";
		int rs=0;
		try {
			id=Authentication.getId(token);
			rs=DatabaseManagement.deleteMs(id, msid);
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Result.toJSResult(rs);
	}
}
