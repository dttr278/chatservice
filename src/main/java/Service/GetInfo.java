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
	@Path("{id2}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getif(@PathParam("id2") String id2,
			@HeaderParam("Authorization") String token) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getInfo(Integer.valueOf(id),Integer.valueOf(id2));
		} catch (Exception e) {
		}
		return Result.toJSResult(rs);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getinfo(@HeaderParam("Authorization") String token) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getInfo(Integer.valueOf(id),Integer.valueOf(id));;
		} catch (Exception e) {
		}
		return Result.toJSResult(rs);
	}
}
