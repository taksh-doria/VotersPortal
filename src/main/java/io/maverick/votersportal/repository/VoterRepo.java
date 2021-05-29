package io.maverick.votersportal.repository;

import io.maverick.votersportal.model.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoterRepo extends JpaRepository<Voter,Long>,CustomVoterRepo{
}
