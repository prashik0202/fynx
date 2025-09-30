interface SessionAttributes {
  id: number;
  userId: number;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
}

interface SessionCreationAttributes
  extends Omit<SessionAttributes, "id" | "createdAt" | "expiresAt"> {}