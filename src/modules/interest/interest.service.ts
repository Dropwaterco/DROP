import { waitlistRepository } from '../waitlist/waitlist.repository';
import { CreateInterestDto, InterestRecord } from './interest.types';
import { notificationService } from '../notifications/notification.service';
import { MongoServerError } from 'mongodb';

export class InterestService {
  /**
   * Express interest via single email input
   * Updates an existing lead source rather than creating duplicates
   */
  public async expressInterest(
    dto: CreateInterestDto
  ): Promise<{ lead: InterestRecord; isNew: boolean }> {
    const existing = await waitlistRepository.findByEmail(dto.email);

    if (existing) {
      // Update existing lead source if needed, or keep it, and return isNew: false
      const updated = await waitlistRepository.update(existing.id, {
        leadSource: dto.leadSource,
        utmSource: dto.utmSource || existing.utmSource,
        utmMedium: dto.utmMedium || existing.utmMedium,
        utmCampaign: dto.utmCampaign || existing.utmCampaign,
      });
      return { lead: updated, isNew: false };
    }

    try {
      const lead = await waitlistRepository.create(dto);
      
      // Async trigger confirmation email
      notificationService.sendConsumerWaitlistConfirmation({
        email: lead.email,
        name: undefined,
      }).catch((err) => {
        console.error('⚠️ Failed to send interest confirmation email:', err.message);
      });

      return { lead, isNew: true };
    } catch (error) {
      // Concurrency check when the email index is unique.
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

export const interestService = new InterestService();
