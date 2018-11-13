/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Service;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;

@Path("chats")
public class GetChats {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getChat(@HeaderParam("Authorization") String token) {
		String id = null,rs="0";
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.getChats(id);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
}
