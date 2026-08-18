
package com.lifelink.bloodbank_backend.exception;

public class DonorNotFoundException extends RuntimeException {

    public DonorNotFoundException(String message) {
        super(message);
    }
}