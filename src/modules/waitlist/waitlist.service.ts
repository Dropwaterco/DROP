import { waitlistRepository } from './waitlist.repository';
import { CreateLeadDto, ConsumerLeadRecord } from './waitlist.types';
import { notificationService } from '../notifications/notification.service';
import { MongoServerError } from 'mongodb';

export class WaitlistService {
  /**
   * Register a consumer on the waitlist
   * Returns the lead record and a boolean indicating if it was a new registration
   */
  public async register(
    dto: CreateLeadDto
  ): Promise<{ lead: ConsumerLeadRecord; isNew: boolean }> {
    const existing = await waitlistRepository.findByEmail(dto.email);
    
    if (existing) {
      // If it exists, return it with isNew: false
      return { lead: existing, isNew: false };
    }

    try {
      const lead = await waitlistRepository.create(dto);
      
      // Async trigger confirmation email without blocking the response
      notificationService.sendConsumerWaitlistConfirmation({
        email: lead.email,
        name: lead.name || undefined,
      }).catch((err) => {
        console.error('⚠️ Failed to send waitlist confirmation email:', err.message);
      });

      return { lead, isNew: true };
    } catch (error) {
      // Handle concurrent race conditions when the email index is unique.
      if (
        error instanceof MongoServerError &&
        error.code === 11000
      ) {
        const raceConditionLead = await waitlistRepository.findByEmail(dto.email);
        if (raceConditionLead) {
          return { lead: raceConditionLead, isNew: false };
        }
      }
      throw error;
    }
  }
}

export const waitlistService = new WaitlistService();
