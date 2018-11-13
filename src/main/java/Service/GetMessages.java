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

@Path("/messages")
public class GetMessages{
	private @Context HttpServletRequest request;
	
	@GET
	@Path("{id2}")
	
	@Produces(MediaType.APPLICATION_JSON)
	public String messages(@PathParam("id2") String id2,@HeaderParam("Authorization") String token) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getMessages(id,id2);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
}


