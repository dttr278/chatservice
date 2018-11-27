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

/**
 *
 * @author DO TAN TRUNG
 */
@Path("/search")
public class Search {

	@GET
	@Path("{id2}/{top}")
	@Produces(MediaType.APPLICATION_JSON)
	public String srch(@PathParam("id2") String id2,
			@PathParam("top") String top
			,@HeaderParam("Authorization") String token) {
		String id="0";
		String rs=null;
		try {
			id=Authentication.getId(token);
			rs=DatabaseManagement.search(Integer.valueOf(id), id2,Integer.valueOf(top));
			
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Result.toJSResult(rs);
	}
	
	@GET
	@Path("{top}")
	@Produces(MediaType.APPLICATION_JSON)
	public String srch(@PathParam("top") String top
			,@HeaderParam("Authorization") String token) {
		String id="0";
		String rs=null;
		try {
			id=Authentication.getId(token);
			rs=DatabaseManagement.search(Integer.valueOf(id),"",Integer.valueOf(top));
			
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Result.toJSResult(rs);
	}
}
