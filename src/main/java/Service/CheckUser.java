/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Service;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import Model.DatabaseManagement;
import Model.Result;

/**
 *
 * @author DO TAN TRUNG
 */
@Path("/checkuser")
public class CheckUser{
	@GET
	@Path("{user}")
	@Produces(MediaType.APPLICATION_JSON)
	public String check(@PathParam("user") String usr) {
		return Result.toJSResult(DatabaseManagement.checkUserName(usr));
	}
}
