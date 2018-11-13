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

@Path("/info")
public class GetInfo {
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getif(@PathParam("id") String id) {
		return Result.toJSResult(DatabaseManagement.getInfo(id));
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getinfo(@HeaderParam("Authorization") String token) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getInfo(id);
		} catch (Exception e) {
		}
		return Result.toJSResult(rs);
	}
}
