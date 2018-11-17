package Service;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;

@Path("/contacts")
public class GetContacts{
	@Context HttpServletRequest request;
	
	@GET
	@Path("{top}")
	@Produces(MediaType.APPLICATION_JSON)
	public String contacts(@HeaderParam("Authorization") String token,@PathParam("top") String top) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getContacts(id,top,null,null);
		} catch (Exception e) {
		}
		return Result.toJSResult(rs);
	}
	
	@GET
	@Path("{top}/{bigthan}/{smallthan}")
	@Produces(MediaType.APPLICATION_JSON)
	public String contacts(@HeaderParam("Authorization") String token
			,@PathParam("top") String top
			,@PathParam("bigthan") String bigthan
			,@PathParam("smallthan") String smallthan) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getContacts(id,top,bigthan,smallthan);
		} catch (Exception e) {
		}
		return Result.toJSResult(rs);
	}
}
