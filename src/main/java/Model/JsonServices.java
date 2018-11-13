/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;


import com.google.gson.GsonBuilder;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
/**
 *
 * @author DO TAN TRUNG
 */
public class JsonServices {
   public static String convertToJSON(ResultSet resultSet)
           {  
       GsonBuilder gb=new GsonBuilder();
       gb.setPrettyPrinting();
       JsonArray jsonArray = new JsonArray();
       String property,value;
        try {
			while (resultSet.next()) {
			    int total_columns = resultSet.getMetaData().getColumnCount();
			    JsonObject obj = new JsonObject();
			    for (int i = 0; i < total_columns; i++) {
			    	property=resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase();
			    	if(resultSet.getObject(i + 1)!=null) {
			    		value= resultSet.getObject(i + 1).toString();
			    	}else
			    		value="";
			        obj.addProperty(property, value);
			    }
			  jsonArray.add(obj);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(jsonArray.size()>0)
        	return jsonArray.toString();
        return null;
    }
   public static String convertToJSONObj(ResultSet resultSet)
            {  
       GsonBuilder gb=new GsonBuilder();
       gb.setPrettyPrinting();
       String property,value;
       JsonObject obj=null;
        try {
			while (resultSet.next()) {
			    int total_columns = resultSet.getMetaData().getColumnCount();
			    obj = new JsonObject();
			    for (int i = 0; i < total_columns; i++) {
			    	property=resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase();
			    	if(resultSet.getObject(i + 1)!=null) {
			    		value= resultSet.getObject(i + 1).toString();
			    	}else
			    		value="";
			        obj.addProperty(property, value);
			    }
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(obj!=null)
        	return obj.toString();
        return null;
    }
}
