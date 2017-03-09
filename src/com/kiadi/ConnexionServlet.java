package com.kiadi;

import twitter4j.Paging;
import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.ResponseList;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.auth.RequestToken;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

@SuppressWarnings("serial")
public class ConnexionServlet extends HttpServlet {
	
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
    	
    	response.setContentType("text/plain");
    	
    	
    	Twitter twitter = connexion();
    	
    	String hashtag = "#Humour";
    	
    	
    	try {
	        Query query = new Query(hashtag);
	        query.setLang("fr");
	        
	        QueryResult result = twitter.search(query);
	        List<Status> tweets = result.getTweets();
	        
	        for (Status status : tweets ) {
	    		response.getWriter().println(status.getText());
	    		response.getWriter().println(status.getUser().getName());
	    		response.getWriter().println();
	        }
	        
    	} catch (TwitterException e) {
	    	throw new ServletException(e);
	    }


		System.out.println("Successfully updated the status in Twitter.");
    }
    
    public Twitter connexion() {
    	Twitter twitter = new TwitterFactory().getInstance();

    	twitter.setOAuthConsumer("3LnNjvmNKsMreE5zO0FR3Bync", "7msnsozbPZ0olTQGosWidT03U5IomTqz7zuRbu3hvi3eH1WdTl");
		AccessToken accessToken = new AccessToken("3236397357-NifCo5GFMHDClwu7bDg5bhdsgTt4yVSGiMxOLR1",
				"h8U5xIxLIpHkdJBNj95VVSsudHPBkRr4BSsOTKMECg2BU");

		twitter.setOAuthAccessToken(accessToken);
		
		return twitter;
    	
    }
    
    public Properties load(String filename) throws IOException, FileNotFoundException{
    	
        Properties properties = new Properties();
        FileInputStream input = new FileInputStream(filename); 
        
        try{
           properties.load(input);
           return properties;
        } finally {
           input.close();
        }

     }
    
}
