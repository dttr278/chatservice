package Service;


import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import Model.DatabaseManagement;
import Model.Result;

@Path("createuser")
public class CreateUser{
   @POST
   @Produces(MediaType.APPLICATION_JSON)
   public String create(String body,
		   @QueryParam("username") String usr,
		   @QueryParam("password") String pass,
		   @QueryParam("name") String name,
		   @QueryParam("sex") String sex,
		   @QueryParam("email") String email,
		   @QueryParam("birthday") String birthday,
		   @QueryParam("phone") String phone) {
	   if(usr==null) {
		   System.out.println(body);
		   Gson gson=new Gson();
		   User u=gson.fromJson(body, User.class);
		   if(u!=null) {
			   usr=u.getUsername();
			   pass=u.getPassword();
			   name=u.getName();
			   sex = u.getSex();
			   email= u.getEmail();
			   birthday= u.getBirthday();
			   phone= u.getPhone();
		   }
	   }
	   int a=0;
	   if(usr!=null)
	    a=DatabaseManagement.createUser(usr, pass, name, sex, email, birthday, phone);
	   return Result.toJSResult(a);
	  
   }
}
class User{
	String username,password,name,sex,email,birthday,phone;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
