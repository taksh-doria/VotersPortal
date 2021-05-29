package io.maverick.votersportal.repository;

import io.maverick.votersportal.model.Voter;

public interface CustomVoterRepo {
     Voter findVoter(String hash);
}
