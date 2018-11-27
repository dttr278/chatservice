package Service;

import java.io.InputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

import Model.Authentication;
import Model.DatabaseManagement;
import Model.MyFile;
import Model.Result;

@Path("/avatar")
public class ChangeAvatar {
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response uploadFile(
		@FormDataParam("file") InputStream uploadedInputStream,
		@FormDataParam("file") FormDataContentDisposition fileDetail,
		@HeaderParam("Authorization") String token) {
		System.out.println(uploadedInputStream);
		System.out.println(fileDetail);
		String id;
		int rs=0;
		try {
			id=Authentication.getId(token);
			MyFile mf=MyFile.upload(uploadedInputStream, fileDetail);
			if(mf!=null) {
				rs=DatabaseManagement.changeAvatar(Integer.valueOf(id), mf);
			}
		} catch ( Exception e) {
			System.out.println(e);
		}
		return Response.status(200).entity(Result.toJSResult(rs)).build();
	}
}
