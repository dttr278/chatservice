package Model;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.io.IOUtils;

import com.sun.jersey.core.header.FormDataContentDisposition;

public class MyFile {
    String name,path,type;

    public MyFile() {
    	name=path=type=null;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    private static final String  SAVE_FILE="uploadDir/";
    private static int c=0;
    public static MyFile upload(InputStream uploadedInputStream,FormDataContentDisposition fileDetail) {
		MyFile mf=new MyFile();
		try {
			
			
			File ft=new File(SAVE_FILE);
			if(!ft.exists()) {
				ft.mkdirs();
			}
	//		System.out.println(ft.getPath());
			String type="";
			if(fileDetail.getFileName().lastIndexOf(".")!=-1) {
				type=fileDetail.getFileName()
						.substring(fileDetail.getFileName().lastIndexOf('.'), fileDetail.getFileName().length());;
			}
			
			String uploadedFileLocation = SAVE_FILE + String.valueOf(c)+type;
	//		System.out.println(uploadedFileLocation);
			// save it
			byte [] bytes = IOUtils.toByteArray(uploadedInputStream);
			writeFile(bytes, uploadedFileLocation);
		//	writeToFile(uploadedInputStream, uploadedFileLocation);
			
			
			mf.setName(new String(fileDetail.getFileName().getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8));
			String mimeType=Files.probeContentType(Paths.get(uploadedFileLocation));
			mf.setType(mimeType);
			if(mf.getType()==null)
				mf.setType(MediaType.APPLICATION_OCTET_STREAM);
			File f=new File(uploadedFileLocation);
			
			String newName=Hash.MD5.checksum(f);
			String newPath=SAVE_FILE +newName+type;
	//		System.out.println(newPath);
			File f1=new File(newPath);
		
			Files.move(f.toPath(), f1.toPath(), StandardCopyOption.REPLACE_EXISTING);
			f.delete();
			mf.setPath(newPath);
			c++;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
			mf=null;
		}
		return mf;
	}
    public static void writeFile(byte[] content, String filename) throws IOException {
		File file = new File(filename);
		if (!file.exists()) {
			file.createNewFile();
		}
		FileOutputStream fop = new FileOutputStream(file);
		fop.write(content);
		fop.flush();
		fop.close();
	}
    
    public static Response download(int id) {     
	 	MyFile mf=DatabaseManagement.getFile(id);
	    Response response = null;

	    File file = new File(mf.getPath());
	    if (file.exists()) {
	      ResponseBuilder builder = Response.ok(file);
	      builder.header("Content-Disposition", "attachment; filename=" + (new String(mf.getName().getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1)));
	      builder.type(mf.getType());
	      response = builder.build();

	    } else {
	       
	      response = Response.status(404).
	              entity("FILE NOT FOUND: " + mf.getPath()).
	              type("text/plain").
	              build();
	    }  
	    return response;
 }
}