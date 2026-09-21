package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Services;
import ma.inetum.restonetbackend.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceServiceImp implements ServiceService{

    @Autowired
    ServiceRepository serviceRepository;
    @Override
    public List<Services> getAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public Services getServiceById(Integer serviceId) {
        return serviceRepository.findById(serviceId).get();
    }
}
