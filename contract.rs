use anchor_lang::prelude::*;

declare_id!("YourProgramIdHere"); // Replace with the program ID from `solana program deploy`

#[program]
pub mod content_creation_platform {
    use super::*;

    pub fn register_content(ctx: Context<RegisterContent>, title: String) -> Result<()> {
        let content = &mut ctx.accounts.content;
        content.author = *ctx.accounts.author.key;
        content.title = title;
        content.tips_received = 0;
        Ok(())
    }

    pub fn tip_creator(ctx: Context<TipCreator>, amount: u64) -> Result<()> {
        let content = &mut ctx.accounts.content;
        let author = &ctx.accounts.author;

        // Transfer SOL to the content author
        **ctx.accounts.author.try_borrow_mut_lamports()? += amount;
        **ctx.accounts.user.try_borrow_mut_lamports()? -= amount;

        // Update tips received
        content.tips_received += amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct RegisterContent<'info> {
    #[account(init, payer = author, space = 8 + 32 + 4 + 4)] // Add enough space for the data
    pub content: Account<'info, Content>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TipCreator<'info> {
    #[account(mut)]
    pub content: Account<'info, Content>,
    /// CHECK: This is safe because we are only transferring lamports
    #[account(mut)]
    pub author: AccountInfo<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Content {
    pub author: Pubkey,
    pub title: String,
    pub tips_received: u64,
}
