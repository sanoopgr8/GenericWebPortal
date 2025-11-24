package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {

    @Autowired
    private MailConfigRepository mailConfigRepository;

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(EmailService.class);

    private JavaMailSender createMailSender(MailConfig config) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(config.getHost());
        mailSender.setPort(config.getPort());
        mailSender.setUsername(config.getUsername());
        mailSender.setPassword(config.getPassword());

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", config.getProtocol());
        props.put("mail.smtp.auth", String.valueOf(config.isAuth()));
        props.put("mail.smtp.starttls.enable", String.valueOf(config.isStarttls()));
        props.put("mail.debug", "true");

        return mailSender;
    }

    public void sendVerificationEmail(String toEmail, String firstName, String verificationToken, jakarta.servlet.http.HttpServletRequest request) {
        logger.info("Attempting to send verification email to: {}", toEmail);
        
        MailConfig config = mailConfigRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Mail configuration not found"));

        JavaMailSender mailSender = createMailSender(config);
        
        // Build base URL from request headers (set by nginx)
        String scheme = request.getHeader("X-Forwarded-Proto");
        String host = request.getHeader("X-Forwarded-Host");
        
        // Fallback to request if headers not present
        if (scheme == null) {
            scheme = request.getScheme();
        }
        if (host == null) {
            host = request.getServerName();
        }
        
        // Remove any port number from host if it's already there
        // (X-Forwarded-Host might include port in some configurations)
        if (host.contains(":")) {
            host = host.substring(0, host.indexOf(":"));
        }
        
        // Only add port if it's non-standard
        // Standard ports: 80 for http, 443 for https
        // Since nginx handles SSL, we should always use standard ports
        String baseUrl = scheme + "://" + host;
        String verificationLink = baseUrl + "/verify?token=" + verificationToken;
        
        logger.info("Verification link: {}", verificationLink);
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(config.getFromEmail());
            message.setTo(toEmail);
            message.setSubject("Verify Your Email - Web Portal");
            message.setText(String.format(
                "Hello %s,\n\n" +
                "Thank you for signing up for Web Portal!\n\n" +
                "Please click the link below to verify your email address:\n" +
                "%s\n\n" +
                "This link will expire in 24 hours.\n\n" +
                "If you didn't create an account, please ignore this email.\n\n" +
                "Best regards,\n" +
                "%s",
                firstName, verificationLink, config.getFromName()
            ));
            
            mailSender.send(message);
            logger.info("Verification email sent successfully to: {}", toEmail);
        } catch (Exception e) {
            logger.error("Failed to send verification email to: " + toEmail, e);
            throw e;
        }
    }
}
