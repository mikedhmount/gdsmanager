package com.damounts.gdsmanager.repository;

import com.damounts.gdsmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  User findByUserName(String userName);
  Optional<User> findByUserEmail(String userEmail);
  Optional<User> findByUserNameAndUserPassword(String userName, String userPassword);
}
