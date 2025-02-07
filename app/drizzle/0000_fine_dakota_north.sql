CREATE TABLE `habitCompletions` (
	`completionId` text PRIMARY KEY NOT NULL,
	`habitID` text NOT NULL,
	`completedDate` text NOT NULL,
	FOREIGN KEY (`habitID`) REFERENCES `habits`(`habitID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`habitID` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`category` text NOT NULL,
	`startDate` text NOT NULL,
	`goal` text NOT NULL
);
