package com.example.usermanagement.Data;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User,String> {
    @Query("{ 'username' : ?0 }")
    User checkUsernameExist(String username);

    @Query("{'username': ?0, 'password' :  ?1}")
    User findEmployeeByUsernameAndPassword(String username,String password);
}
