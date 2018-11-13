package Model;

public class Result {
	public static String toJSResult(Object value) {
		// TODO Auto-generated method stub
		return "{\"result\":"+String.valueOf(value)+"}";
	}
	public static String toJSResult(String name,Object value) {
		// TODO Auto-generated method stub
		return "{\""+name+"\":"+String.valueOf(value)+"}";
	}
}
