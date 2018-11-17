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

@Path("/groups")
public class GetGroups {
	@GET
	@Path("{top}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getGroups(@HeaderParam("Authorization") String token,@PathParam("top") String top) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getGroups(id,top);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
	
	@GET
	@Path("{top}/{bigthan}/{smallthan}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getGroups(@HeaderParam("Authorization") String token
			,@PathParam("top") String top
			,@PathParam("bigthan") String bigthan
			,@PathParam("smallthan") String smallthan) {
		bigthan=bigthan.trim();
		if(bigthan.equals("null")||bigthan.isEmpty()) {
			bigthan=null;
			
		}
		smallthan=smallthan.trim();	
		if(smallthan.equals("null")||smallthan.isEmpty()) {
			smallthan=null;
			
		}
		
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getGroups(id,top,bigthan,smallthan);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
	
	@GET
	@Path("{top}/{bigthan}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getGroups(@HeaderParam("Authorization") String token
			,@PathParam("top") String top
			,@PathParam("bigthan") String bigthan) {
		bigthan=bigthan.trim();
		if(bigthan.equals("null")||bigthan.equals("undefined")||bigthan.isEmpty()) {
			bigthan=null;
			
		}
		
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getGroups(id,top,bigthan,null);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
}
