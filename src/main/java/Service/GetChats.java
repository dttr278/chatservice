/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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

@Path("/chats")
public class GetChats {
	@GET
	@Path("{top}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getChat(@HeaderParam("Authorization") String token,@PathParam("top") String top) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getChats(id,top,null,null);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
	
	@GET
	@Path("{top}/{bigthan}/{smallthan}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getChat(@HeaderParam("Authorization") String token
			,@PathParam("top") String top
			,@PathParam("bigthan") String bigthan
			,@PathParam("smallthan") String smallthan) {
		
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getChats(id,top,bigthan,smallthan);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
	
	@GET
	@Path("{top}/{bigthan}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getChat(@HeaderParam("Authorization") String token
			,@PathParam("top") String top
			,@PathParam("bigthan") String bigthan) {
		bigthan=bigthan.trim();
		if(bigthan.equals("null")||bigthan.isEmpty()) {
			bigthan=null;
			
		}
		
		
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getChats(id,top,bigthan,null);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
}
