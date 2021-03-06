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
	@Path("{chatId}/{top}")
	@Produces(MediaType.APPLICATION_JSON)
	public String messages(@PathParam("chatId") String chatId
			,@PathParam("top") String top
			,@HeaderParam("Authorization") String token) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getMessages(chatId,id,top,null,null);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
}


