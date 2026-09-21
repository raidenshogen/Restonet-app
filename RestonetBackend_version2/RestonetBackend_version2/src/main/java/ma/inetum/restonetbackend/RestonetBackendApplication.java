package ma.inetum.restonetbackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@SpringBootApplication
public class RestonetBackendApplication {

	public static void main(String[] args) {
	SpringApplication.run(RestonetBackendApplication.class, args);

	}

	@Bean
	public String checkDatabaseConnection(DataSource dataSource) {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		jdbcTemplate.queryForObject("SELECT 1 FROM Dual", Integer.class);
		return "Database is up and running!";

	}


}
