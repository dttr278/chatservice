package config;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class CORSFilter implements Filter {

	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, 
            FilterChain filterChain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		 final HttpServletResponse response = (HttpServletResponse) servletResponse;
	        response.setHeader("Access-Control-Allow-Origin", "*");
	        response.setHeader("Access-Control-Allow-Credentials", "true");
	        response.setHeader("Access-Control-Allow-Methods", "POST, GET,PUT,DELETE, HEAD, OPTIONS");
	        response.setHeader("Access-Control-Allow-Headers", "Origin, Accept, x-auth-token,authorization, "
	                + "Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	        filterChain.doFilter(servletRequest, servletResponse);
		
	}
	public void destroy() {
		// TODO Auto-generated method stub
		
	}


}