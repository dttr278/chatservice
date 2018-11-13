package Service;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.Result;


import com.google.gson.Gson;

@Path("/sendmessage")
public class AddMessage{
	@Context HttpServletRequest request;	
	@POST
	@Path("{id2}")
	@Produces(MediaType.APPLICATION_JSON)
	public String addMs(String body,@PathParam("id2") String id2
			,@HeaderParam("Authorization") String token
			,@QueryParam("message") String ms) 
					throws UnsupportedEncodingException {
		String id;
		int rs=0;
		try {
			id=Authentication.getId(token);
			if(ms==null||ms.isEmpty()) {
				Gson gson=new Gson();
				Message m=gson.fromJson(body, Message.class);
				ms=m.getMessage();
			}
			if(ms!=null) {
				if(!ms.isEmpty()) {
					ms=java.net.URLDecoder.decode(ms, "UTF-8");
					rs=DatabaseManagement.addMessage(id, id2, ms);
				}	
			}
			
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Result.toJSResult(rs);
		
	}
}

class Message{
	String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}

