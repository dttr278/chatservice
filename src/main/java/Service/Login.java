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


import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;


/**
 *
 * @author DO TAN TRUNG
 */
@Path("/login")
public class Login{
	


	@Path("{u}/{p}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String signin(
			@PathParam("u") String user
			,@PathParam("p") String pass) {
		int a= DatabaseManagement.checkLogin(user, pass);	
		String rs=a+"";
		if(a>0) {
			rs= Authentication.createJWT(""+a);
		}
		return Result.toJSResult("token","\""+rs+"\"");
	}

}
