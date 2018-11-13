/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Service;


import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;

/**
 *
 * @author DO TAN TRUNG
 */
@Path("seen")
public class Seen{
	private @Context HttpServletRequest request;
	@POST
	@Path("{id2}")
	@Produces(MediaType.APPLICATION_JSON)
	public String seen(@PathParam("id2") String id2,@HeaderParam("Authorization") String token) {
		String id = null;
		int rs=0;
		try{
			id=Authentication.getId(token);
			rs= DatabaseManagement.seen(id, id2);
		} catch (Exception e) {
		}

		return Result.toJSResult(rs);
	}
}
