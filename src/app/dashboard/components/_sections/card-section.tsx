import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Avatar } from "@/components/avatar";
import { SectionWrapper } from "./section-wrapper";

export function CardSection() {
  return (
    <SectionWrapper id="cards" title="6. Cards">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Basic card */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Basic Card</p>
          <Card>
            <Card.Body>
              <p className="text-sm text-slate-700">
                A simple card with just a body section. Useful for displaying any generic content
                inside a contained, styled container.
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Card with header + body + footer */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Header + Body + Footer
          </p>
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">Project Notes</h3>
                <Badge variant="info">Editing</Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <p className="text-sm text-slate-600">
                Document key decisions, blockers, and next steps for the team here.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex gap-2">
                <Button variant="primary" size="sm">Save</Button>
                <Button variant="ghost" size="sm">Cancel</Button>
              </div>
            </Card.Footer>
          </Card>
        </div>

        {/* Stat card */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Stat Card</p>
          <Card className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Monthly Revenue</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">$48,295</p>
              </div>
              <div className="rounded-xl bg-emerald-100 p-3">
                <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                ↑ +18.2% vs last month
              </span>
            </div>
          </Card>
        </div>

        {/* Profile card */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Profile Card</p>
          <Card className="p-5">
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="User avatar"
                className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-100"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-800">Sarah Chen</h3>
                  <Badge variant="success">Online</Badge>
                </div>
                <p className="text-xs text-slate-500">Senior Product Designer</p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Crafting intuitive digital experiences with a focus on accessibility and design systems.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="primary" size="sm">Message</Button>
                  <Button variant="secondary" size="sm">View Profile</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
}
