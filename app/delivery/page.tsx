import { Truck, Package, Clock, Globe } from "lucide-react";

export const metadata = { title: "Delivery Information" };

const options = [
  {
    icon: Truck,
    name: "Standard UK Delivery",
    time: "3–5 business days",
    price: "£3.99 (FREE over £40)",
    detail: "Tracked, discreet packaging. Delivered by Royal Mail or DPD.",
  },
  {
    icon: Clock,
    name: "Express UK Delivery",
    time: "Next working day",
    price: "£6.99",
    detail: "Order before 2pm Monday–Friday. Tracked and signed-for.",
  },
  {
    icon: Globe,
    name: "International Delivery",
    time: "7–14 business days",
    price: "From £12.99",
    detail: "Available to EU, US, Canada, Australia. Tracked where available.",
  },
];

export default function DeliveryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Delivery Information</h1>
        <p className="text-gray-500 text-sm">All orders are packed discreetly — no brand markings on the outside.</p>
      </div>

      <div className="space-y-4 mb-10">
        {options.map(({ icon: Icon, name, time, price, detail }) => (
          <div key={name} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4">
            <div className="w-11 h-11 bg-blush-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-blush-500" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="font-semibold text-gray-900 text-sm">{name}</p>
                <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">{time}</span>
                <span className="text-xs font-semibold text-blush-500">{price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="prose prose-sm text-gray-600 space-y-4">
        <h2 className="text-lg font-display font-bold text-gray-900">Discreet Packaging Promise</h2>
        <p>Every KamaToys order is shipped in a plain, unmarked cardboard box or padded envelope. The sender name on the parcel reads "KT Retail Ltd." — no mention of KamaToys or any indication of contents.</p>
        <p>Your bank or card statement will show "KT RETAIL LTD" as the merchant name.</p>

        <h2 className="text-lg font-display font-bold text-gray-900 mt-6">Order Cut-off Times</h2>
        <p>Orders placed before <strong>2pm GMT</strong> on a working day are dispatched the same day. Orders placed after 2pm or on weekends are dispatched the next working day.</p>

        <h2 className="text-lg font-display font-bold text-gray-900 mt-6">Tracking</h2>
        <p>You'll receive an email with tracking details as soon as your order is dispatched. You can also use our <a href="/track-order" className="text-blush-500 hover:underline">Track Order</a> page.</p>
      </div>
    </div>
  );
}
