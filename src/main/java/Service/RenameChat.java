package Service;

import javax.ws.rs.HeaderParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;

@Path("/renamechat")
public class RenameChat {
	@PUT
	@Path("{cid}/{name}")
	public String dl(@PathParam("cid") String cid
			,@PathParam("name") String name
			,@HeaderParam("Authorization") String token) {
		String id="0";
		int rs=0;
		try {
			id=Authentication.getId(token);
			rs=DatabaseManagement.renameChat(id, cid, name);
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Result.toJSResult(rs);
	}
}
