package io.maverick.votersportal.repository;

import io.maverick.votersportal.model.Voter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Repository
public class CustomVoterRepoImpl implements CustomVoterRepo{

    @PersistenceContext
    EntityManager manager;

    @Override
    @Transactional(readOnly = true)
    public Voter findVoter(String hash) {
        Query query=manager.createNativeQuery("select v.* from voter as v where v.hash= ?",Voter.class);
        query.setParameter(1,hash);
        return (Voter)query.getSingleResult();
    }
}
