package edu.eci.arsw.blueprints.controllers.dao;

import java.util.List;

public class BlueprintBody {
    String author, name;
    List<String> points;

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<String> getPoints() {
        return points;
    }
    public void setPoints(List<String> points) {
        this.points = points;
    }
    
    

}
