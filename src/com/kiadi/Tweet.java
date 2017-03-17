package com.kiadi;
import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;


@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class Tweet {

	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	Long id;

	@Persistent
	String content; //Content of a tweet
	
	@Persistent
	String author; //Author of a tweet
	
	@Persistent
	Date date; //Date of parution of a tweet
	
	@Persistent
	String category; //Category of a tweet 
	
	@Persistent
	String falseAuthor1;
	
	@Persistent
	String falseAuthor2;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public String getAuthor() {
		return author;
	}
	
	public void setAuthor(String author) {
		this.author = author;
	}
	
	public Date getDate() {
		return date;
	}
	
	public void setDate(Date date) {
		this.date = date;
	}
	
	public String getCategory() {
		return category;
	}
	
	public void setCategory(String category) {
		this.category = category;
	}
	
	public boolean isCategory(String category) {
		return this.category.equals(category);
	}
	
	public String getFalseAuthor1() {
		return falseAuthor1;
	}
	
	public String getFalseAuthor2() {
		return falseAuthor2;
	}
	
	public void setFalseAuthor1(String falseAuthor) {
		this.falseAuthor1 = falseAuthor;
	}
	
	public void setFalseAuthor2(String falseAuthor) {
		this.falseAuthor2 = falseAuthor;
	}
}