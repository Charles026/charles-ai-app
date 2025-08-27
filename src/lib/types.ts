import type { StaticImageData } from 'next/image';
/**
 * AI SDK UI Messages. They are used in the client and to communicate between the frontend and the API routes.
 */
export interface Message {
    /**
      A unique identifier for the message.
       */
    id: string;
    /**
      The timestamp of the message.
       */
    createdAt?: Date;
    /**
      Text content of the message. Use parts when possible.
       */
    content: string;
    /**
      The 'data' role is deprecated.
       */
    role: "system" | "user" | "assistant";
    /**
     * The parts of the message. Use this for rendering the message in the UI.
     *
     * Assistant messages can have text, reasoning and tool invocation parts.
     * User messages can have text parts.
     */
    // note: optional on the Message type (which serves as input)
    parts?: Array<TextUIPart>;
    /** 可选的卡片信息，用于在消息中渲染 UI 卡片 */
    card?: CardInfo;
  }
  /**
   * A text part of a message.
   */
  export type TextUIPart = {
    type: "text";
    /**
     * The text content.
     */
    text: string;
  };

export interface CardInfo {
  title: string;
  description?: string;
  duration?: string; // e.g., '6m'
  sources?: number;
  searches?: number;
  /** Optional href used to navigate when the card is clicked */
  href?: string;
  /** Optional image shown on the right side of the card. Use a public path like '/images/xxx.png' */
  imageSrc?: string;
  /** Optional alt text for the image */
  imageAlt?: string;
  /** Alternatively pass a static import for Next/Image */
  image?: StaticImageData | string;
}