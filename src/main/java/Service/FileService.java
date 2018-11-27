package Service;


import java.io.InputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.MyFile;
import Model.Result;

@Path("/file")
public class FileService {
	@POST
	@Path("/send/{id2}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response uploadFile(
		@FormDataParam("file") InputStream uploadedInputStream,
		@FormDataParam("file") FormDataContentDisposition fileDetail,
		@PathParam("id2") String id2,
		@HeaderParam("Authorization") String token) {
		
		String id;
		String rs="0";
		try {
			id=Authentication.getId(token);
			MyFile mf=MyFile.upload(uploadedInputStream, fileDetail);
			if(mf!=null) {
				rs=DatabaseManagement.sendFile(Integer.valueOf(id), Integer.valueOf(id2), mf.getName()+":"+mf.getType(), mf);
			}
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Response.status(200).entity(Result.toJSResult(rs)).build();
	}

	@GET
	  @Path("/download/{id}")
	  @Produces(MediaType.APPLICATION_OCTET_STREAM)
	  public Response downloadFilebyPath(@PathParam("id")  String id) {
	    return MyFile.download(Integer.valueOf(id));
	  }
	

}