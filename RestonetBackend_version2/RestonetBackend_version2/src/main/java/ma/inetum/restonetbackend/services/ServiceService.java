package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Services;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ServiceService {

    List<Services> getAllServices();

    Services getServiceById (Integer serviceId);
}
