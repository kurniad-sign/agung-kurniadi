import { Asterisk } from 'lucide-react';

import { RunningText } from '@/components/shared/running-text';

export function CallToAction() {
  return (
    <section className="section section--cta">
      <div className="c-running-animation">
        <RunningText>
          Let&apos;s Talk <Asterisk />
        </RunningText>
      </div>
    </section>
  );
}
